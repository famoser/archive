<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 28.08.2016
 * Time: 11:10
 */

namespace Famoser\OnlineOfficeBundle\Form;


use Famoser\OnlineOfficeBundle\Form\Base\BaseFormType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AddressType extends BaseFormType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $options = $this->parseOptionsArray($options);

        self::addFields($builder,
            array(
                'streetAddress' => TextType::class,
                'postalCode' => TextType::class,
                'addressLocality' => TextType::class,
                'addressCountry' => TextType::class,
                'telefone' => TextType::class,
                'description' => TextType::class
            ));

        self::addSubmitButton($builder);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Famoser\OnlineOfficeBundle\Entity\Adress',
        ));
    }
}